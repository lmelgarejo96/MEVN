<template>
    <!-- <nav class="navbar navbar-dark bg-dark">
        <a href="/" class="navbar-brand"><strong>MEVN APP</strong></a>
    </nav> -->
    <nav  id="menu" class="navbar navbar-expand-lg navbar-dark bg-dark navbar-expand-lg bg-light sticky-top">
    <div class="container">
         <a href="/" class="navbar-brand"><strong>FULLSTACK MEVN - USER CRUD</strong></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item ">
                    <a class="nav-link" href="/users">  Users <i class="fas fa-user"> </i></a>
                </li>
                <!-- <li class="nav-item">
                    <a class="nav-link" href="/about"><i class="fas fa-building"> </i> About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/contact"><i class="fas fa-envelope"> </i> Contact</a>
                </li> -->
            </ul>
        </div>
    </div>
</nav>
</template>
<script>
export default {
    name: 'Navbar'
}
</script>