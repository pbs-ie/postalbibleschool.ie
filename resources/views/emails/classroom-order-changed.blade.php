<x-mail::message>

# Order changes made for {{ $schoolName }}

View updates made to the order

<x-mail::button :url="$url">
View Order
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}

</x-mail::message>