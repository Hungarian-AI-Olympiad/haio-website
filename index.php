<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Főoldal | HAIO</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:wght@600;700&display=swap"
        rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">

    <!-- Bootstrap JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

</head>

<body>

    <!-- HEADER -->
    <?php include 'header.php'; ?>

    <!-- HERO SECTION -->
    <section class="hero-section" id="hero">
        <div class="container">
            <h1 class="hero-title text-center" id="dynamic-title">
            </h1>
        </div>
    </section>

    <!-- SELECTION TABLE -->
    <section class="selection-section" id="programs">
        <div class="container">
            <h2 class="text-center">Válaszd ki a programot, amely érdeklődésed felkeltette!</h2>
        </div>
    <div class="container mt-5">
        <div class="row g-4">
            <div class="col-md-6">
                <div class="selection-card" id="molo-card">
                    <h3 class="selection-title">MÓLÓ</h3>
                    <p class="selection-description">Ingyenes, online felkészítő program.</p>
                    <a href="./molo.php" class="btn selection-btn" id="molo-btn">Tovább</a>
                    <p class="card-notice">Elindult az idei regisztráció!</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="selection-card" id="haio-card">
                    <h3 class="selection-title">HAIO</h3>
                    <p class="selection-description">Az MI olimpiák magyar válogatóversenye.</p>
                    <a href="./haio.php" class="btn selection-btn" id="haio-btn">Tovább</a>
                </div>
            </div>
        </div>
        
        <!-- Discord Card -->
        <div class="row g-4 mt-2">
            <div class="col-12">
                <div class="selection-card discord-card" id="discord-card">
                    <i class="fab fa-discord discord-icon"></i>
                    <h3 class="selection-title">Discord közösség</h3>
                    <p class="selection-description">Csatlakozz hozzánk, beszélgess társaiddal, tedd fel kérdéseidet és találkozz más MI rajongókkal!</p>
                    <a href="https://discord.gg/pwpqHTcsZQ" class="btn selection-btn" id="discord-btn" target="_blank">
                        <i class="fab fa-discord"></i> Csatlakozás
                    </a>
                </div>
            </div>
        </div>
    </div>
    </section>

    <!-- Custom JavaScript -->
    <script src="js/script.js"></script>
    
    <!-- FOOTER -->
    <?php include 'footer.php'; ?>

</body>

</html>