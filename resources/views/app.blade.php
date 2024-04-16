<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta head-key="description" name="description"
        content="Postal Bible School is an organisation in Ireland which promotes the study of the Bible through free Bible study tools and Bible courses online for all ages.">
    <link head-key="favicon" rel="shortcut icon" href="/favicon.png" type="image/png">

    <title inertia>{{ config('app.name', 'Postal Bible School') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">
    <link
        href="https://fonts.bunny.net/css?family=roboto:100,400,400i,500,500i,700,700i|roboto-slab:500,700|lato:200,400,700,400i|bitter:400,400i,600,600i"
        rel="stylesheet" />


    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/ts/app.tsx', "resources/ts/Pages/{$page['component']}.tsx"])
    @inertiaHead
    @production
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YLR8NDJV53"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-YLR8NDJV53');
    </script>
    @endproduction
</head>



<body class="font-sans antialiased">
    @inertia
</body>

</html>
