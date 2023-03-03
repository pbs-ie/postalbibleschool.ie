<x-mail::message>

# Contact Inquiry from {{$contactName}}

<x-mail::table>
| Name:            |
| :--------------- |
| {{$contactName}} |
</x-mail::table>

<x-mail::table>
| Email:            |
| :---------------- |
| {{$contactEmail}} |
</x-mail::table>

<x-mail::table>
| Description:            |
| :---------------------- |
| {{$contactDescription}} |
</x-mail::table>

Thanks,<br>
{{ config('app.name') }} Website

</x-mail::message>