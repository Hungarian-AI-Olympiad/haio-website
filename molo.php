<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MÓLÓ Program | HAIO</title>

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
        <h1>MÓLÓ Program</h1>
    </section>

    <!-- CONTENT SECTION -->
    <section class="content-section">
        <div class="container">

            <!-- Hero Section -->
            <div class="molo-hero">
                <h1 id="urlap">Magyar MI Olimpia - MÓLÓ Program</h1>
                <p class="lead">Csatlakozz te is Magyarország legújabb MI versenyéhez!</p>
                <a href="https://forms.office.com/e/DhJwPyEW4C" class="btn btn-light btn-lg mt-3" target="_blank">
                    <i class="fas fa-edit"></i> Regisztrálás a felkészítőre
                </a>
            </div>

            <!-- Mi a MÓLÓ? -->
            <div class="molo-content-block">
                <h2>Mi a MÓLÓ Program?</h2>
                    <p>
                        A <b>MÓLÓ</b> célja, hogy a középiskolás diákokat megismertesse az MI programozásával. A legjobbak egyúttal felkészülhetnek a Magyar MI Olimpián (HAIO) és a nemzetközi MI versenyeken való részvételre is.
                    </p>
                <p>
                    A felkészítő <b>ingyenes</b>, és minden 9-12. évfolyamos diák számára elérhető, függetlenül az
                    előzetes
                    programozási vagy MI ismeretektől. Az alapoktól indulunk, és lépésről lépésre jutunk el a
                    versenyfeladatok szintjéig.
                </p>
            </div>

            <!-- Miért MÓLÓ? -->
            <div class="molo-content-block">
                <h2>Miért érdemes csatlakozni?</h2>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <div class="molo-feature-box">
                            <h4><i class="fas fa-users"></i> Szakértő mentorok</h4>
                            <p>Egyetemi oktatók és MI szakértők segítenek a tanulásban.</p>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="molo-feature-box">
                            <h4><i class="fas fa-laptop-code"></i> Gyakorlati feladatok</h4>
                            <p>Valós problémákon dolgozol, nem csak elméletet tanulsz.</p>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="molo-feature-box">
                            <h4><i class="fas fa-globe"></i> Nemzetközi lehetőség</h4>
                            <p>A legjobban teljesítők világversenyeken képviselhetik Magyarországot!</p>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="molo-feature-box">
                            <h4><i class="fas fa-certificate"></i> Igazolás</h4>
                            <p>Részvételi igazolást kapsz, ami jól mutat az önéletrajzodban!</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hogyan zajlik? -->
            <div class="molo-content-block">
                <h2>Hogyan zajlik a felkészítő?</h2>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="text-center">
                            <div class="molo-circle-icon">
                                <i class="fas fa-chalkboard-teacher"></i>
                            </div>
                            <h5>Online előadások</h5>
                            <p>Rengeteg online anyag lesz elérhető, és havonta tartunk konzultációkat az MI programozásáról.</p>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="text-center">
                            <div class="molo-circle-icon">
                                <i class="fas fa-code"></i>
                            </div>
                            <h5>Gyakorlati feladatok</h5>
                            <p>Gyakorlati feladatok is elérhetők lesznek, amelyeket otthon megoldhatsz.</p>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="text-center">
                            <div class="molo-circle-icon">
                                <i class="fas fa-comments"></i>
                            </div>
                            <h5>Közösség & támogatás</h5>
                            <p>Discord szerveren kérdezz bátran, és tanulj társaiddal együtt!</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Kiknek ajánljuk? -->
            <div class="molo-content-block">
                <h2>Kiknek ajánljuk a MÓLÓ programot?</h2>
                <ul class="molo-custom-list">
                    <li><i class="fas fa-check-circle"></i> 9-12. évfolyamos diákoknak, akik érdeklődnek az MI iránt
                    </li>
                    <li><i class="fas fa-check-circle"></i> Azoknak, akik szeretnék fejleszteni programozási
                        készségeiket</li>
                    <li><i class="fas fa-check-circle"></i> Versenyszellemű fiataloknak, akik szívesen mérik össze
                        tudásukat másokkal</li>
                    <li><i class="fas fa-check-circle"></i> Mindenkinek, aki kíváncsi a jövő technológiájára!</li>
                </ul>
                <p class="mt-3 molo-alert-success">
                    <i class="fas fa-star"></i> <b>Nem kell előzetes MI tapasztalat!</b> Az alapoktól kezdjük, így bárki
                    csatlakozhat.
                </p>
            </div>


        </div>
    </section>

    <!-- FOOTER -->
    <?php include 'footer.php'; ?>

</body>

</html>