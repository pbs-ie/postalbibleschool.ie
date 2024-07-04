<x-mail::message>

# {{ $schoolName }} has made changes to their order

View updates by clicking the button below

<x-mail::button :url="$url" color="primary">
View Order
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}

</x-mail::message>