import os

# Archivo de salida
archivo_salida = "codigo_completo.txt"

# Carpetas y archivos a ignorar
ignorar_carpetas = {'node_modules', '.git', 'dist', 'build'}
extensiones_validas = {'.js', '.jsx', '.ts', '.tsx', '.css', '.html'}

with open(archivo_salida, 'w', encoding='utf-8') as f_out:
    for raiz, carpetas, archivos in os.walk('.'):
        # Filtrar carpetas a ignorar
        carpetas[:] = [c for c in carpetas if c not in ignorar_carpetas]
        
        for archivo in archivos:
            _, ext = os.path.splitext(archivo)
            if ext in extensiones_validas:
                ruta_completa = os.path.join(raiz, archivo)
                f_out.write(f"\n{'='*80}\n")
                f_out.write(f"ARCHIVO: {ruta_completa}\n")
                f_out.write(f"{'='*80}\n\n")
                
                try:
                    with open(ruta_completa, 'r', encoding='utf-8') as f_in:
                        f_out.write(f_in.read())
                except Exception as e:
                    f_out.write(f"[Error al leer el archivo: {e}]\n")

print(f"Proyecto consolidado con éxito en '{archivo_salida}'")