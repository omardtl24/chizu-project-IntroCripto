"use client";
import React from "react";
import { Download, X, DownloadCloud } from "lucide-react";
import { FileItem } from "../types";

interface DownloadDialogProps {
    isOpen: boolean;
    onClose: () => void;
    files: FileItem[]; // Recibe archivos dinámicamente
}

const DownloadDialog: React.FC<DownloadDialogProps> = ({ isOpen, onClose, files }) => {
    if (!isOpen) return null;

    // Generar IDs automáticamente si no existen
    const processedFiles = files.map(file => ({
        ...file,
        id: file.id ?? crypto.randomUUID(), // Asigna un ID si no tiene
    }));

    // Función para descargar un archivo
    const handleDownload = (url: string, name: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = name; // Intenta descargar con el nombre dado
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Función para descargar todos los archivos
    const handleDownloadAll = () => {
        processedFiles.forEach(file => handleDownload(file.url, file.name));
        console.log("Descargando todos los archivos...");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Descargar archivos</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4">
                    <div className="space-y-3">
                        {processedFiles.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{file.name}</p>
                                </div>
                                <button
                                    onClick={() => handleDownload(file.url, file.name)}
                                    className="ml-4 p-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-full transition-colors"
                                >
                                    <Download size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t bg-gray-50">
                    <button
                        onClick={handleDownloadAll}
                        className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        <DownloadCloud size={20} />
                        <span>Descargar todo</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadDialog;
