<!DOCTYPE html>
<style>
    body {
        color: #12141c;
        font-family: ProximaNova, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
        font-weight: 600;
    }
</style>
<div
    style="display:flex;justify-content:center;align-items:center; width:100%;height:90vh;">
    <div style="display: flex; flex-direction: column; align-items: center;">
        <a href="/"
            style="display: inline-flex; justify-content:center; align-items: center; flex-direction:column;font-size:1.5rem;line-height:2rem;margin-bottom:0;"
            aria-label="logo">
            <img src="{{ asset('favicon.png') }}" alt="PBS Icon"
                style="width: 5rem;height:5rem" />
            <p style="text-transform: uppercase; font-weight: 600">
                Postal Bible School</p>
        </a>

        <h1>404</h1>
        <h2>Page not found</h2>

        <p>Could not find the page you are looking for</p>

        <a href="/home"
            style="display: inline-block; padding: 0.75rem 1.5rem; font-size: 1rem; line-height: 1.25rem; font-weight: 600; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05rem; border-radius: 5rem; border: 1px solid; transition: all 300ms ease;"
            className="inline-block px-8 py-3 text-sm font-semibold text-center text-gray-500 transition duration-100 bg-gray-200 rounded-lg outline-none hover:bg-gray-300 focus-visible:ring ring-indigo-300 active:text-gray-700 md:text-base">
            Go home</a>
    </div>

</div>