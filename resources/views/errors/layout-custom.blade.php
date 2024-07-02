<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>@yield('title')</title>

        <!-- Styles -->
        <style>
            html,
            body {
                background-color: #fff;
                color: #343434;
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .content {
                text-align: center;
                display: flex;
                flex-direction: column;
            }


            .logo {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                font-size: 1.5rem;
                line-height: 2rem;
                margin-bottom: 0;
                text-transform: uppercase;
                font-weight: 600;
            }

            .message {
                word-wrap: normal;
                max-width: 100ch;
            }

            .home-button {
                display: inline-block;
                padding: 0.75rem 1.5rem;
                font-size: 1rem;
                line-height: 1.25rem;
                font-weight: 600;
                text-decoration: none;
                text-transform: uppercase;
                letter-spacing: 0.05rem;
                border-radius: 5rem;
                border: 1px solid #2a62e7;
                transition: all 300ms ease;
                text-align: center;
                color: #000000;
                margin-top: 0.5rem;
            }

            .home-button:hover {
                background-color: #e5e7eb;
            }

            a {
                color: inherit;
                text-decoration: none;
            }


            h1 {
                margin-bottom: 0.5rem;
                font-size: 3rem;
                font-weight: 800;
            }

            h2 {
                margin-bottom: 0.5rem;
                font-size: 1.5rem;
                font-weight: 400;
            }
        </style>
    </head>

    <body>
        <div class="flex-center position-ref full-height">
            <div class="content">
                <a href="/" class="logo" aria-label="logo">
                    <img src="{{ asset('favicon.png') }}" alt="PBS Icon"
                        style="width: 5rem;height:5rem" />
                    <p>
                        Postal Bible School</p>
                </a>

                <h1>@yield('code')</h1>
                <div class="message">
                    <h2>@yield('message')</h2>
                </div>
                <div>
                    <a href="/home" class="home-button"
                        className="bg-pbsblue">
                        Go home</a>
                </div>
            </div>
        </div>
    </body>

</html>