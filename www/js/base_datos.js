function inicializa_db() 
{
 var db;
 db = openDatabase("ejemplo3.db3", "1.0", "Ministerio de Justicia", 500000);
 if (db) 
 {
            // Database opened

/* ---------------------------------------------------------------------- */
/* Tablas Catálogo Abierto de Datos                                       */
/* ---------------------------------------------------------------------- */
	
/* ---------------------------------------------------------------------- */
/* Add table "informacion_programa"                                          */
/* ---------------------------------------------------------------------- */

db.transaction( function(tx) {

				 tx.executeSql("CREATE TABLE IF NOT EXISTS informacion_programa ( \
								id_programa INTEGER NOT NULL, \
								programa TEXT NOT NULL, \
								caracterizacion_usuario TEXT NOT NULL, \
								tipo_informacion TEXT NOT NULL, \
								descripcion_tipo_informacion TEXT NOT NULL, \
								entidad_encargada TEXT NOT NULL, \
								tipo_entidad TEXT NOT NULL, \
								PRIMARY KEY (id_programa))");
            });


/* ---------------------------------------------------------------------- */
/* Add table "ubicacion_programa"                                          */
/* ---------------------------------------------------------------------- */

db.transaction( function(tx) {

				 tx.executeSql("CREATE TABLE IF NOT EXISTS ubicacion_programa ( \
								id_ubicacion INTEGER NOT NULL, \
								codigo_dane_departamento TEXT NOT NULL, \
								departamento TEXT NOT NULL, \
								codigo_dane_municipio TEXT NOT NULL, \
								municipio TEXT NOT NULL, \
								tipo_programa TEXT NOT NULL, \
								nombre_lugar TEXT NOT NULL, \
								direccion_lugar TEXT NOT NULL, \
								barrio_lugar TEXT NOT NULL, \
								telefono_lugar TEXT NOT NULL, \
								email TEXT NOT NULL, \
								latitud TEXT NOT NULL, \
								longitud TEXT NOT NULL, \
								PRIMARY KEY (id_ubicacion))");
            });


/* ---------------------------------------------------------------------- */
/* Add table "palabras_clave"                                          */
/* ---------------------------------------------------------------------- */

db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS palabra_clave ( \
								id_palabra_clave INTEGER NOT NULL, \
								nombre_palabra_clave INTEGER NOT NULL, \
								id_programa INTEGER NOT NULL, \
								PRIMARY KEY (id_palabra_clave), \
								FOREIGN KEY (id_programa) REFERENCES informacion_programa (id_programa))");
            });

/* ---------------------------------------------------------------------- */
/* Fin Tablas Catálogo Abierto de Datos                                   */
/* ---------------------------------------------------------------------- */


/* ---------------------------------------------------------------------- */
/* Tablas de Configuración del Sistema                                    */
/* ---------------------------------------------------------------------- */
            db.transaction( function(tx) {
				tx.executeSql("CREATE TABLE IF NOT EXISTS tipo_parametro(codigo_tparametro integer primary key, nombre_tparametro text)");
            });

            db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS parametro ( \
								codigo_parametro INTEGER NOT NULL, \
								valor_parametro TEXT NOT NULL, \
								convencion_parametro TEXT NOT NULL, \
								codigo_tparametro INTEGER NOT NULL, \
								PRIMARY KEY (codigo_parametro, codigo_tparametro), \
								FOREIGN KEY (codigo_tparametro) REFERENCES tipo_parametro (codigo_tparametro))");							   
            });	 
/* ---------------------------------------------------------------------- */
/* Fin Tablas de Configuración del Sistema                                */
/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */
/* Cargue de Información paramétrica	                                  */
/* ---------------------------------------------------------------------- */


db.transaction( function(tx) {
tx.executeSql("Delete from tipo_parametro;")
	
tx.executeSql("insert into tipo_parametro values(1,'Correo Electrónico');")
tx.executeSql("insert into tipo_parametro values(2,'Cuenta Twitter');")
tx.executeSql("insert into tipo_parametro values(3,'Cuenta Youtube');")
tx.executeSql("insert into tipo_parametro values(4,'Set de Datos Abiertos');")

tx.executeSql("Delete from parametro;")
tx.executeSql("Delete from palabra_clave;")

tx.executeSql("insert into parametro values(1,'simonmoya@gmail.com','E-mail Ministerio de Justicia',1);")
tx.executeSql("insert into parametro values(2,'winnie54817@gmail.com','E-mail Ministerio de Justicia',1);")
tx.executeSql("insert into parametro values(3,'MinjusticiaCo','Ministerio de Justicia',2);")
tx.executeSql("insert into parametro values(4,'hC9tD_GTxNg','Casas de Justicia',3);")
tx.executeSql("insert into parametro values(5,'mcf8Wwqw4JQ','Centros de Convivencia Ciudadana',3);")
tx.executeSql("insert into parametro values(6,'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Justicia/informacionprogramas?$format=json','informacion_programa',4);")
tx.executeSql("insert into parametro values(7,'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Justicia/ubicacionprogramas?$format=json','ubicacion_programa',4);")

tx.executeSql("Select count(*) as numero From palabra_clave", [],
                function(tx, result){
                    for(var i=0; i < result.rows.length; i++) 
					 if ([result.rows.item(i)['numero']] == 0) actualiza_set_datos();					
                });	

            });


/* ---------------------------------------------------------------------- */
/* Fin Cargue de Información paramétrica	                              */
/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */
	 
/* ---------------------------------------------------------------------- */
/* Target DBMS:           SQLite3                                         */
/* Project file:          Ministerio de Justicia SqlLite.dez              */
/* Project name:          TODO BIEN                                       */
/* Author:                Simón Moya Jiménez                              */
/* Script type:           Database creation script                        */
/* Created on:            2013-09-14 16:28                                */
/* ---------------------------------------------------------------------- */


/* ---------------------------------------------------------------------- */
/* Begin script creation                                                                 */
/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */
/* Add table departamento                                               */
/* ---------------------------------------------------------------------- */

db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS departamento ( \
						       id_departamento INTEGER NOT NULL, \
							   nombre_departamento TEXT NOT NULL, \
							   codigo_dane_departamento TEXT NOT NULL, \
							   PRIMARY KEY (id_departamento))");
            });

/* ---------------------------------------------------------------------- */
/* Add table municipio                                                    */
/* ---------------------------------------------------------------------- */
db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS municipio ( \
						       id_municipio INTEGER NOT NULL, \
							   nombre_municipio TEXT NOT NULL, \
							   codigo_dane_municipio TEXT NOT NULL, \
							   id_departamento INTEGER NOT NULL, \
							   PRIMARY KEY (id_municipio, id_departamento), \
							   FOREIGN KEY (id_departamento) REFERENCES departamento (id_departamento))");
            });

/* ---------------------------------------------------------------------- */
/* Add table tipo_programa                                                */
/* ---------------------------------------------------------------------- */
db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS tipo_programa ( \
							   id_tipo_programa INTEGER NOT NULL, \
							   nombre_tipo_programa TEXT NOT NULL, \
							   PRIMARY KEY (id_tipo_programa))");
            });

/* ---------------------------------------------------------------------- */
/* Add table programa                                                     */
/* ---------------------------------------------------------------------- */
db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS programa ( \
							   id_programa INTEGER NOT NULL, \
							   nombre_programa TEXT, \
							   barrio_programa TEXT, \
							   email_programa TEXT NOT NULL, \
							   id_tipo_programa INTEGER NOT NULL, \
							   id_departamento INTEGER NOT NULL, \
						       id_municipio INTEGER NOT NULL, \
						       PRIMARY KEY (id_programa), \
							   FOREIGN KEY (id_tipo_programa) REFERENCES tipo_programa (id_tipo_programa), \
							   FOREIGN KEY (id_municipio,id_departamento) REFERENCES municipio (id_municipio,id_departamento))");
            });

/* ---------------------------------------------------------------------- */
/* Add table direccion                                                    */
/* ---------------------------------------------------------------------- */
db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS direccion ( \
							   id_direccion INTEGER NOT NULL, \
							   texto_direccion TEXT NOT NULL, \
							   latitud_direccion TEXT, \
							   longitud_direccion TEXT, \
							   observacion_direccion TEXT, \
							   id_programa INTEGER NOT NULL, \
						       PRIMARY KEY (id_direccion), \
							   FOREIGN KEY (id_programa) REFERENCES programa (id_programa))");
            });


/* ---------------------------------------------------------------------- */
/* Add table telefono                                                     */
/* ---------------------------------------------------------------------- */
db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS telefono ( \
							   id_telefono INTEGER NOT NULL, \
							   numero_telefono NUMERIC NOT NULL, \
							   id_programa INTEGER NOT NULL, \
							   PRIMARY KEY (id_telefono), \
							   FOREIGN KEY (id_programa) REFERENCES programa (id_programa))");
            });

/* ---------------------------------------------------------------------- */
/* Add table tipo_informacion                                             */
/* ---------------------------------------------------------------------- */

db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS tipo_informacion ( \
								id_tipo_informacion INTEGER NOT NULL, \
								nombre_tipo_informacion TEXT NOT NULL, \
								PRIMARY KEY (id_tipo_informacion))");
            });

/* ---------------------------------------------------------------------- */
/* Add table tipo_usuario                                                 */
/* ---------------------------------------------------------------------- */

db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS tipo_usuario ( \
								id_tipo_usuario INTEGER NOT NULL, \
								nombre_tipo_usuario TEXT NOT NULL, \
								PRIMARY KEY (id_tipo_usuario))");
            });

/* ---------------------------------------------------------------------- */
/* Add table tipo_entidad                                                 */
/* ---------------------------------------------------------------------- */

db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS tipo_entidad ( \
								id_tipo_entidad INTEGER NOT NULL, \
								nombre_tipo_entidad INTEGER NOT NULL, \
								PRIMARY KEY (id_tipo_entidad))");
            });

/* ---------------------------------------------------------------------- */
/* Add table "entidad_encargada"                                          */
/* ---------------------------------------------------------------------- */

db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS entidad_encargada ( \
								id_entidad_encargada INTEGER NOT NULL, \
								nombre_entidad_encargada INTEGER NOT NULL, \
								descripcion_entidad_encargada TEXT, \
								id_tipo_programa INTEGER NOT NULL, \
								id_tipo_entidad INTEGER NOT NULL, \
								PRIMARY KEY (id_entidad_encargada), \
								FOREIGN KEY (id_tipo_programa) REFERENCES tipo_programa (id_tipo_programa), \
								FOREIGN KEY (id_tipo_entidad) REFERENCES tipo_entidad (id_tipo_entidad))");
            });

/* ---------------------------------------------------------------------- */
/* Add table atiende_tipo_usuario                                         */
/* ---------------------------------------------------------------------- */

db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS atiende_tipo_usuario ( \
								id_entidad_encargada INTEGER NOT NULL, \
								id_tipo_usuario INTEGER NOT NULL, \
								PRIMARY KEY (id_entidad_encargada, id_tipo_usuario), \
								FOREIGN KEY (id_entidad_encargada) REFERENCES Entidad_encargada (id_entidad_encargada), \
								FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario (id_tipo_usuario))");
            });

/* ---------------------------------------------------------------------- */
/* Add table orienta                                                      */
/* ---------------------------------------------------------------------- */

db.transaction( function(tx) {
				 tx.executeSql("CREATE TABLE IF NOT EXISTS orienta ( \
								id_entidad_encargada INTEGER NOT NULL, \
								id_tipo_informacion INTEGER NOT NULL, \
								PRIMARY KEY (id_entidad_encargada, id_tipo_informacion), \
								FOREIGN KEY (id_entidad_encargada) REFERENCES Entidad_encargada (id_entidad_encargada), \
								FOREIGN KEY (id_tipo_informacion) REFERENCES tipo_informacion (id_tipo_informacion))");
            });

/* ---------------------------------------------------------------------- */
/* End script creation                                                    */
/* ---------------------------------------------------------------------- */
 }
}