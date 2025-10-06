<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HAIO | HAIO</title>

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

    <!-- PAGE TITLE -->
    <section class="page-title">
        <h1>HAIO - Hungarian AI Olympiad</h1>
    </section>

    <!-- CONTENT SECTION -->
    <section class="content-section">
        <div class="container">
            <!-- Mi a HAIO? -->
            <div class="haio-content-block">
                <h2>Mi a HAIO?</h2>
                <p>
                    A 2024-es és 2025-ös sikerek után <b>2026-ban ismét megrendezésre kerülnek a Nemzetközi
                        Mesterségesintelligencia-diákolimpiák (IOAI, IAIO)</b>!
                    A verseny <b>a 9–12. évfolyamos diákoknak szól</b>, és várjuk a jelentkezőket vidéki és határon túli
                    iskolákból is.
                </p>
                <p>
                    A verseny célja, hogy a középiskolás diákok megismerkedjenek a mesterséges intelligencia
                    alapjaival, és gyakorlati tapasztalatot szerezzenek a különböző MI algoritmusok
                    implementálásában. A verseny továbbá lehetőséget biztosít a diákok számára, hogy
                    megmérettessék magukat a mesterséges intelligencia területén.
                </p>
                <p class="haio-alert-success mt-3">
                    <i class="fas fa-star"></i> <b>A legjobban teljesítő diákok nemzetközi versenyeken képviselhetik
                        Magyarországot!</b>
                </p>
            </div>

            <!-- Miért érdemes jelentkezni? -->
            <div class="haio-content-block">
                <h2>Miért érdemes jelentkezni?</h2>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <div class="haio-feature-box">
                            <h4><i class="fas fa-laptop-code"></i> Gyakorlati tapasztalat</h4>
                            <p>Ismerd meg a mesterséges intelligencia legújabb technológiáit!</p>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="haio-feature-box">
                            <h4><i class="fas fa-globe"></i> Nemzetközi lehetőség</h4>
                            <p>A legjobban teljesítők képviselhetik Magyarországot világversenyeken!</p>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="haio-feature-box">
                            <h4><i class="fas fa-users"></i> Közösség</h4>
                            <p>Csatlakozz hozzád hasonló érdeklődésű diákokhoz!</p>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="haio-feature-box">
                            <h4><i class="fas fa-graduation-cap"></i> Ingyenes felkészítés</h4>
                            <p>Szakértőink segítségével felkészülhetsz a versenyre a MÓLÓ programon keresztül!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <?php include 'footer.php'; ?>

</body>

</html>