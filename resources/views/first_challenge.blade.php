<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>First Challenge</title>
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    </head>

    <script type="text/javascript">
        window.teams = {!! json_encode($teams) !!};
    </script>

    <body>
        <div id="root"></div>
        <script src="{{mix('js/app.js')}}" ></script>
    </body>
</html>