<template>
    <div class="row">
        <div class="row">
            <h2 class="fw-bold title">Creación API</h2>
            <p class="text">Empezemos por crear nuestra API RESTful, que será desarrollada con: <br>
                <br>
                <i class="fa-solid fa-microchip"></i> PHP 8 <br>
                <i class="fa-solid fa-microchip"></i> MySQL <br>
                <br>
                Para las pruebas puedes probar cualquier entorno en el que te sientas cómodo como <a
                    href="https://www.postman.com/downloads/" target="_blank">Postman</a> o la extensión para VS Code <a
                    href="https://www.thunderclient.com/" target="_blank">Thunder Client</a>, sin embargo
                podrás utilizar la que desees.
            </p>
        </div>

        <div class="row">
            <h2 class="title">Api <i class="fa-solid fa-circle-arrow-right"></i> Estructura <br>
                de Archivos</h2>
            <div class="col">
                <img src="@/assets/AboutMe.png" alt="Img">
            </div>

            <div class="col">
                <p class="text">Hemos creado las carpetas: api, class y config para organizar nuestros archivos de trabajo
                    <br>
                    Podrás correr el proyecto a través de MAMP o WAMP o también puedes hacerlo por Línea de Comandos donde
                    te dejo como realizarlo.
                </p>
            </div>
        </div>

        <div class="row mt-5">
            <p class="text text-center">Navega a el directorio donde está localizado tu proyecto: Utiliza cd</p>

            <div v-highlight>
                <pre class="language-php">
                    <code class="code">
                        cd php-tu-proyecto
                    </code>
                </pre>
            </div>
        </div>

        <div class="row mt-5">
            <p class="text text-center">Cuando estés ubicado en el directorio, inicia el Servidor de PHP.</p>

            <div v-highlight>
                <pre class="language-php">
                    <code class="code">
                        php -S 127.0.0.1:8080
                    </code>
                </pre>
            </div>
        </div>

        <div class="row mt-5">
            <h2 class="title">Api <i class="fa-solid fa-circle-arrow-right"></i> MySql: Creación y <br>
                Configuración</h2>

            <p class="text"> En PhpMyAdmin podrás crear de manera fácil y práctica tu BD(Base de Datos) y tablas necesarias,
                sin embargo a continuación están los Query para que puedas crearlas.
                <br>
                Recuerda, en bdname puede ser el nombre de tu elección, recuerda las buenas prácticas para nombrarlas.
            </p>
        </div>

        <div class="row mt-5">
            <p class="text text-center">Crear BD</p>

            <div v-highlight>
                <pre class="language-sql">
                    <code class="code">
                        CREATE DATABASE bdname;
                    </code>
                </pre>
            </div>
        </div>

        <div class="row mt-5">
            <p class="text text-center">Consultar BD actuales</p>

            <div v-highlight>
                <pre class="language-sql">
                    <code class="code">
                        SHOW DATABASES;
                    </code>
                </pre>
            </div>
        </div>

        <div class="row mt-5">
            <p class="text text-center">Usar la BD</p>

            <div v-highlight>
                <pre class="language-sql">
                    <code class="code">
                        USE bdname;
                    </code>
                </pre>
            </div>
        </div>

        <div class="row mt-5">
            <p class="text text-center">Crear Tabla "Empleados"</p>

            <div v-highlight>
                <pre class="language-sql">
                    <code class="code">
                        CREATE TABLE IF NOT EXISTS empleado (
                            id INT(11) NOT NULL AUTO_INCREMENT,
                            nombre VARCHAR(256) NOT NULL,
                            apellido VARCHAR(256) NOT NULL,
                            correo VARCHAR(256) NOT NULL,
                            PRIMARY KEY (id),
                        );
                    </code>
                </pre>
            </div>
        </div>

        <div class="row mt-5">
            <h2 class="title">Api <i class="fa-solid fa-circle-arrow-right"></i> Crear Conexión a <br>
                BD</h2>

            <div class="col">
                <p class="text">Vamos a conectarnos a nuestra BD con PHP y PDO (PHP Data Objects). Dentro de la
                    carpeta Config, crearemos el archivo <span class="fw-bold">database.php</span> y escribiremos el
                    siguiente código.</p>
            </div>

            <div class="col">
                <div v-highlight>
                    <pre class="language-php">
                    <code class="code">
                        class Database
                        {

                            private $host = "127.0.0.1"; //Host BD
                            private $database_name = "crudphp"; //Nombre Base de Datos
                            private $username = "root"; //Usuario
                            private $password = ""; //Contraseña - Si tenemos asignada escribirla

                            public $conn;

                            //Función para conectarnos con la BD
                            public function getConnection()
                            {
                                $this->conn = null;

                                try {
                                    $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
                                    $this->conn->exec("set names utf8");
                                } catch (PDOException $exception) {
                                    echo "Ups! Hay un problema: " . $exception->getMessage();
                                }

                                return $this->conn;
                            }
                        }
                    </code>
                </pre>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <h2 class="title">Api <i class="fa-solid fa-circle-arrow-right"></i> Crear <br>
                Clase</h2>

            <div class="col">
                <p class="text">Crearemos la clase Empleados. Esto es importante ya que en POO (Programación Orientada a
                    Objetos) nos servirá para encapsular los valores de nuestra BD y en ella definiremos los métodos para
                    nuestro CRUD.</p>
                <p class="text">A través de nuestra clase constructor obtendremos las propiedades de nuestra Tabla por medio
                    de las clase de Conexión. <br>
                    Crear en la carpeta Class el archivo <span class="fw-bold">empleados.php</span>.</p>
            </div>

            <div class="col">
                <div v-highlight>
                    <pre class="language-php">
                    <code class="code">

                        class Empleados
                        {
                            //Variable Conexión
                            private $conn;

                            //Nombre de la tabla
                            private $tabla_bd = "empleados";

                            //Columnas de la tabla
                            public $id;
                            public $nombre;
                            public $apellido;
                            public $correo;

                            //Conexión a BD
                            public function __construct($db)
                            {
                                $this->conn = $db;
                            }

                            //Operaciones CRUD (Create, Read, Update, Delete)

                            //Obtener todos los registros
                            public function obtenerTodos()
                            {
                                $sqlQuery = "SELECT id, nombre, apellido, correo FROM " . $this->tabla_bd . "";
                                $stmt = $this->conn->prepare($sqlQuery);
                                $stmt->execute();
                                return $stmt;
                            }

                            //Obtener un solo registro
                            public function obtenerUno()
                            {
                                $sqlQuery = "SELECT * FROM " . $this->tabla_bd . " WHERE id=? LIMIT 0,1";

                                $stmt = $this->conn->prepare($sqlQuery);

                                //Bind - Enlazar Variables
                                $stmt->bindParam(1, $this->id);

                                $stmt->execute();

                                $filaDato = $stmt->fetch(PDO::FETCH_ASSOC);

                                //Relación de datos a variables
                                $this->nombre = $filaDato['nombre'];
                                $this->apellido = $filaDato['apellido'];
                                $this->correo = $filaDato['correo'];
                            }

                            //Crear
                            public function crear()
                            {
                                $sqlQuery = "INSERT INTO " . $this->tabla_bd . "
                                SET nombre=:nombre,
                                apellido=:apellido,
                                correo=:correo ";

                                $stmt = $this->conn->prepare($sqlQuery);

                                //Sanitización
                                $this->nombre = htmlspecialchars(strip_tags($this->nombre));
                                $this->apellido = htmlspecialchars(strip_tags($this->apellido));
                                $this->correo = htmlspecialchars(strip_tags($this->correo));

                                //Bind - Enlazar Variables
                                $stmt->bindParam(":nombre", $this->nombre);
                                $stmt->bindParam(":apellido", $this->apellido);
                                $stmt->bindParam(":correo", $this->correo);

                                if ($stmt->execute()) {
                                    return true;
                                }

                                return false;
                            }

                            //Actualizar
                            public function actualizar()
                            {
                                $sqlQuery = "UPDATE " . $this->tabla_bd . "
                                SET nombre=:nombre,
                                apellido=:apellido,
                                correo=:correo
                                WHERE id=:id";

                                $stmt = $this->conn->prepare($sqlQuery);

                                //Sanitización
                                $this->nombre = htmlspecialchars(strip_tags($this->nombre));
                                $this->apellido = htmlspecialchars(strip_tags($this->apellido));
                                $this->correo = htmlspecialchars(strip_tags($this->correo));
                                $this->id = htmlspecialchars(strip_tags($this->id));

                                //Bind - Enlazar Variables
                                $stmt->bindParam(':nombre', $this->nombre);
                                $stmt->bindParam(':apellido', $this->apellido);
                                $stmt->bindParam(':correo', $this->correo);
                                $stmt->bindParam(':id', $this->id);

                                if ($stmt->execute()) {
                                    return true;
                                }

                                return false;
                            }

                            //Eliminar
                            public function eliminar()
                            {
                                $sqlQuery = 'DELETE FROM ' . $this->tabla_bd . ' WHERE id=?';

                                $stmt = $this->conn->prepare($sqlQuery);

                                //Sanitización
                                $this->id = htmlspecialchars(strip_tags($this->id));

                                //Bind - Enlazar Variables
                                $stmt->bindParam(1, $this->id);

                                if ($stmt->execute()) {
                                    return true;
                                }

                                return false;
                            }
                        }

                    </code>
                </pre>
                </div>

                <p class="text">Los siguientes métodos gestionan el CRUD: <br>
                    <i class="fa-solid fa-bullseye"></i> __construct() - Alista la conexión. <br>
                    <i class="fa-solid fa-bullseye"></i> obtenerTodos() - Obtiene todos los registros. <br>
                    <i class="fa-solid fa-bullseye"></i> obtenerUno() - Obtiene un solo registro. <br>
                    <i class="fa-solid fa-bullseye"></i> crear() - Crea el registro. <br>
                    <i class="fa-solid fa-bullseye"></i> actualizar() - Actualiza el registro. <br>
                    <i class="fa-solid fa-bullseye"></i> eliminar() - Elimina un registro.
                </p>
            </div>
        </div>

        <div class="row mt-5">
            <h2 class="title">Api <i class="fa-solid fa-circle-arrow-right"></i> Obtener todos los <br>
                Datos</h2>

            <div class="col">
                <p class="text">El siguiente código recupera todos los registros de la tabla MySql. Dentro de la
                    carpeta Api, crearemos el archivo <span class="fw-bold">leer_todos.php</span> y escribiremos el
                    siguiente código.</p>
            </div>

            <div class="col">
                <div v-highlight>
                    <pre class="language-php">
                    <code class="code">

                        header("Access-Control-Allow-Origin: *");
                        header("Content-Type: application/json; charset=UTF-8");

                        //Importamos la Conexión a la BD y la clase
                        include_once '../config/database.php';
                        include_once '../class/empleados.php';

                        //Conexión a BD
                        $database = new Database();
                        $db = $database->getConnection();

                        //Variables Datos
                        $items = new Empleados($db);

                        //Invocamos a la función
                        $stmt = $items->obtenerTodos();
                        $itemConteo = $stmt->rowCount();

                        echo json_encode($itemConteo);

                        if ($itemConteo > 0) {
                            $empleadosLista = array();

                            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                                extract($row);

                                //Array para almacenar los datos del empleado
                                $e = array(
                                    "id" => $id,
                                    "nombre" => $nombre,
                                    "apellido" => $apellido,
                                    "correo" => $correo
                                );

                                array_push($empleadosLista, $e);
                            }

                            echo json_encode($empleadosLista);
                        } else {
                            http_response_code(404);
                            echo json_encode(
                                array("msg" => "Oh no! No encontré registro")
                            );
                        }

                    </code>
                </pre>
                </div>

                <div class="row mt-5">
                    <div class="col">
                        <p class="text">Yo estoy utilizando la Extensión de VS Code Thunder Client donde para conectarnos a
                            nuestro Endpoint PHP, colocamos la URL donde
                            esté ubicado nuestro archivo. Recuerda, como estamos obteniendo información, la petición HTTP
                            debe
                            ser de tipo GET.</p>
                    </div>

                    <div class="col">
                        <img src="@/assets/LeerTodos.png" alt="LeerTodos">
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <h2 class="title">Api <i class="fa-solid fa-circle-arrow-right"></i> Obtener un solo <br>
                Registro</h2>

            <div class="col">
                <p class="text">El siguiente código recupera un solo registro de la tabla MySql. Dentro de la
                    carpeta Api, crearemos el archivo <span class="fw-bold">leer_uno.php</span> y escribiremos el
                    siguiente código.</p>
            </div>

            <div class="col">
                <div v-highlight>
                    <pre class="language-php">
                    <code class="code">

                        header("Access-Control-Allow-Origin: *");
                        header("Content-Type: application/json; charset=UTF-8");
                        header("Access-Control-Allow-Methods: POST");
                        header("Access-Control-Max-Age: 3600");
                        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

                        //Importamos la Conexión a la BD y la clase
                        include_once '../config/database.php';
                        include_once '../class/empleados.php';

                        //Conexión a BD
                        $database = new Database();
                        $db = $database->getConnection();

                        //Variables Datos
                        $item = new Empleados($db);
                        $item->id = isset($_GET['id']) ? $_GET['id'] : die();

                        //Invocamos a la función
                        $item->obtenerUno();

                        if ($item->nombre != null) {
                            //Array para almacenar los datos del empleado

                            $empleadoDatos = array(
                                "id" => $item->id,
                                "nombre" => $item->nombre,
                                "apellido" => $item->apellido,
                                "correo" => $item->correo
                            );

                            http_response_code(200);
                            echo json_encode($empleadoDatos);
                        } else {
                            http_response_code(404);
                            echo json_encode(
                                array("msg" => "Ups! Algo salió mal :(")
                            );
                        }


                    </code>
                </pre>
                </div>

                <div class="row mt-5">
                    <div class="col">
                        <img class="centrar" src="@/assets/LeerUno.png" alt="LeerUno">
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <h2 class="title">Api <i class="fa-solid fa-circle-arrow-right"></i> Crear un <br>
                Registro</h2>

            <div class="col">
                <p class="text">El siguiente código crea un registro en la tabla MySql. Dentro de la
                    carpeta Api, crearemos el archivo <span class="fw-bold">crear.php</span> y escribiremos el
                    siguiente código.</p>
            </div>

            <div class="col">
                <div v-highlight>
                    <pre class="language-php">
                    <code class="code">

                        header("Access-Control-Allow-Origin: *");
                        header("Content-Type: application/json; charset=UTF-8");
                        header("Access-Control-Allow-Methods: POST");
                        header("Access-Control-Max-Age: 3600");
                        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

                        //Importamos la Conexión a la BD y la clase
                        include_once '../config/database.php';
                        include_once '../class/empleados.php';

                        //Conexión a BD
                        $database = new Database();
                        $db = $database->getConnection();

                        //Variables Datos
                        $item = new Empleados($db);
                        $data = json_decode(file_get_contents("php://input"));

                        //Asignación de valores
                        $item->nombre = $data->nombre;
                        $item->apellido = $data->apellido;
                        $item->correo = $data->correo;

                        if ($item->crear()) {
                            echo  json_encode("Genial! Creado Exitosamente");
                        } else {
                            echo json_encode("Oh no! Algo salió mal :(");
                        }

                    </code>
                </pre>
                </div>

                <div class="row mt-5">
                    <div class="col">
                        <img class="centrar" src="@/assets/Crear.png" alt="LeerUno">
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <h2 class="title">Api <i class="fa-solid fa-circle-arrow-right"></i> Actualizar un <br>
                Registro</h2>

            <div class="col">
                <p class="text">El siguiente código actualiza un registro en la tabla MySql. Dentro de la
                    carpeta Api, crearemos el archivo <span class="fw-bold">actualizar.php</span> y escribiremos el
                    siguiente código.</p>
            </div>

            <div class="col">
                <div v-highlight>
                    <pre class="language-php">
                    <code class="code">

                        header("Access-Control-Allow-Origin: *");
                        header("Content-Type: application/json; charset=UTF-8");
                        header("Access-Control-Allow-Methods: POST");
                        header("Access-Control-Max-Age: 3600");
                        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

                        //Importamos la Conexión a la BD y la clase
                        include_once '../config/database.php';
                        include_once '../class/empleados.php';

                        //Conexión a BD
                        $database = new Database();
                        $db = $database->getConnection();

                        //Variable Datos
                        $item = new Empleados($db);
                        $data = json_decode(file_get_contents("php://input"));

                        //Asignación de Variables
                        $item->id = $data->id;
                        $item->nombre = $data->nombre;
                        $item->apellido = $data->apellido;
                        $item->correo = $data->correo;

                        if ($item->actualizar()) {
                            echo json_encode("Super! Actualizado Correctamente");
                        } else {
                            echo json_encode("Oh no! Algo salió mal :(");
                        }

                    </code>
                </pre>
                </div>

                <div class="row mt-5">
                    <div class="col">
                        <img class="centrar" src="@/assets/Actualizar.png" alt="LeerUno">
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-5 mb-5">
            <h2 class="title">Api <i class="fa-solid fa-circle-arrow-right"></i> Eliminar un <br>
                Registro</h2>

            <div class="col">
                <p class="text">El siguiente código elimina un registro en la tabla MySql. Dentro de la
                    carpeta Api, crearemos el archivo <span class="fw-bold">eliminar.php</span> y escribiremos el
                    siguiente código.</p>
            </div>

            <div class="col">
                <div v-highlight>
                    <pre class="language-php">
                    <code class="code">

                        header("Access-Control-Allow-Origin: *");
                        header("Content-Type: application/json; charset=UTF-8");
                        header("Access-Control-Allow-Methods: POST");
                        header("Access-Control-Max-Age: 3600");
                        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

                        //Importamos la Conexión a la BD y la clase
                        include_once '../config/database.php';
                        include_once '../class/empleados.php';

                        //Conexión a la BD
                        $database = new Database();
                        $db = $database->getConnection();

                        //Variable Datos
                        $item = new Empleados($db);
                        $data = json_decode(file_get_contents("php://input"));

                        //Asignación de Variables
                        $item->id = $data->id;

                        if ($item->eliminar()) {
                            echo json_encode("Vale!, Dato Eliminado");
                        } else {
                            echo json_encode("Oh no! Algo salió mal");
                        }

                    </code>
                </pre>
                </div>

                <div class="row mt-5">
                    <div class="col">
                        <img class="centrar" src="@/assets/Eliminar.png" alt="LeerUno">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.text a {
    color: #FFFFFF;
}

.col img {
    width: 60rem;
    height: 100%;
}
</style>