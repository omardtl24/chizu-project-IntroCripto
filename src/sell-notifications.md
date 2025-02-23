## Notificacion Semanal de Ventas a Usuarios Desarrolladores


La logica del envio de correos semanales se implementa en Google Cloud `Cloud Run`:

```
import os
import smtplib
import psycopg2
from email.mime.text import MIMEText
from datetime import datetime, timedelta
from flask import jsonify
import functions_framework 

# Configuración de la base de datos
DB_URI = "postgres://ChizuBd:LaCocacolaRomanica@chizu.ctemo60e6apu.us-east-1.rds.amazonaws.com:5432/chizudb?sslmode=require"

# Configuración del servidor de correo
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_SENDER = "chizugamessocial@gmail.com"
EMAIL_PASSWORD = "afoo rjqy tmng dysr"

def get_last_week_sales():
    """Consulta la base de datos y obtiene las ventas de la última semana."""

    try:
        conn = psycopg2.connect(DB_URI)
        cursor = conn.cursor()

        hoy = datetime.utcnow().replace(hour=12, minute=0, second=0, microsecond=0)
        last_sunday = hoy - timedelta(days=7)
        last_last_sunday = last_sunday - timedelta(days=7)

        query1 = """
          SELECT 
              u.email,
              u.username,
              p.name AS product_name,
              COUNT(or_rels.products_id) AS quantity_sold,
              p.price * COUNT(or_rels.products_id) AS total_sales
          FROM orders o
          JOIN orders_rels or_rels ON o.id = or_rels.parent_id
          JOIN products p ON or_rels.products_id = p.id
          JOIN products_rels pr_rels ON p.id = pr_rels.parent_id
          JOIN users u ON pr_rels.users_id = u.id
          WHERE or_rels.path = 'products'
            AND pr_rels.path = 'user'
            AND o.created_at BETWEEN %s AND %s
          GROUP BY u.email, u.username, p.id, p.name, p.price
          ORDER BY u.username;
        """

        cursor.execute(query1, (last_sunday, hoy))
        sales = cursor.fetchall()

        cursor.execute(query1, (last_last_sunday, last_sunday))
        last_sales = cursor.fetchall()

        cursor.close()
        conn.close()

        sales_dict = {}
        for email, username, product, quantity, total in sales:
          if not sales_dict.get((username, email)):
            sales_dict[(username, email)] = []
          sales_dict[(username, email)].append((product, quantity, float(total)))

        last_sales_dict = {}
        for email, username, product, quantity, total in last_sales:
          if not last_sales_dict.get((username, email)):
            last_sales_dict[(username, email)] = []
          last_sales_dict[(username, email)].append((product, quantity, float(total)))

        return sales_dict, last_sales_dict

    except Exception as e:
        return str(e)


def load_email_template():
    """Carga la plantilla de email desde index.html."""
    with open("index.html", "r", encoding="utf-8") as file:
        return file.read()

def generate_email_content(username, sales_data, last_sales_data, email_date, template):
    """Genera el contenido del email reemplazando valores en la plantilla."""
    product_rows = ""
    subtotal_rows = ""
    total_sales = 0
    popular_qt = 0; popular_product = ""
    last_sales_total = 0
    for product, quantity, subtotal in last_sales_data:
      last_sales_total += subtotal
    
    for product, quantity, subtotal in sales_data:
        if quantity > popular_qt:
            popular_qt = quantity
            popular_product = product

        total_sales += subtotal
        product_rows += f"""
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%; margin: 0px;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;"><strong>{product}</strong></span></p>
    <p style="font-size: 14px; line-height: 140%; margin: 0px;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px; color: #666666;"><span style="font-size: 14px; line-height: 19.6px;">x {quantity}</span></span></p>
      </div>

          </td>
        </tr>
        """

        subtotal_rows += f"""
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="line-height: 140%; margin: 0px;"><strong>Subtotal</strong></p>
    <p style="line-height: 140%; margin: 0px;"><span style="color: #666666; line-height: 19.6px;">${subtotal:.0f}</span></p>
      </div>

          </td>
        </tr>
        """
    
    product_to_replace = "<p>Remplazar Filas de Productos</p>"
    subtotal_to_replace = "<p>Remplazar Filas de Subtotal</p>"

    email_content = template.replace("&iexcl;Hola Usuario!", f"&iexcl;Hola {username}!")
    email_content = email_content.replace("1 de Febrero", email_date)
    email_content = email_content.replace("Juego name", f'{popular_product}')
    email_content = email_content.replace(product_to_replace, product_rows)
    email_content = email_content.replace(subtotal_to_replace, subtotal_rows)
    email_content = email_content.replace("$XXX.X", f"${total_sales:.0f}")
    if last_sales_total > 0:
      email_content = email_content.replace("xx%", f"{last_sales_total/total_sales*100:.2f}%")
    else:
      email_content = email_content.replace("un xx%", f"{total_sales:.0f} más")
      email_content = email_content.replace("de las ventas realizadas la semana pasada.", f"con respecto a las ventas de la semana pasada.")
    
    return email_content

def send_email(sales, last_sales):
    """Envía un correo con el resumen de ventas usando la plantilla HTML."""
    subject = "Resumen semanal de ventas"
    template = load_email_template()

    hoy = datetime.utcnow().replace(hour=12, minute=0, second=0, microsecond=0)
    last = hoy - timedelta(days=7)
    email_date = datetime.strptime(str(last), "%Y-%m-%d %H:%M:%S")
    email_date = email_date.strftime("%d/%m")
    
    for (username, recipient), sales_data in sales.items():
        try: last_sales_data = last_sales[(username, recipient)]
        except: last_sales_data = []

        email_content = generate_email_content(username, sales_data, last_sales_data, email_date, template)
        
        msg = MIMEText(email_content, "html")
        msg["Subject"] = subject
        msg["From"] = EMAIL_SENDER
        msg["To"] = recipient
        
        try:
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, recipient, msg.as_string())
            server.quit()
        except Exception as e:
            return str(e)
    
    return 200


@functions_framework.http
def main(request):
    """Función HTTP para Cloud Run que envía el resumen de ventas."""
    sales_tupla = get_last_week_sales()

    if type(sales_tupla) == str : 
        response = jsonify({"error": sales_tupla})
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response, 500

    sales, last_sales = sales_tupla

    code = send_email(sales, last_sales)
    if code == 200:
        response = jsonify({"message": "Success"})
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response, code
    else:
        response = jsonify({"error": code})
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response, 500
```

La función accede a la plantilla de correo que habita en el archivo **index.html**. Este archivo esta cargado dentro de la imagen del contenedor en el que corre la función.

Una vez implementada la función, esta se agenda para ser ejecutada todos los Domingos a las 12pm usando `Google Scheduler`.
