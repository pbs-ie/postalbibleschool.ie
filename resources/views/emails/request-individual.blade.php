<x-mail::message>

# New Individual Request from {{$latest->firstname}} {{$latest->lastname}}

<x-mail::table>
| First Name | Last Name | Date of Birth |
| :--------- | :-------- | :------------ |
@foreach($studentInfo as $student)
| {{$student['firstname']}} | {{$student['lastname']}} | {{$student['dob']}} |
@endforeach
</x-mail::table>

<x-mail::table>
| Number in Family            |
| :-------------------------- |
| {{$latest->numberInFamily}} |
</x-mail::table>


<x-mail::table>
| Email                   |
| :---------------------- |
| {{$contactInfo->email}} |
</x-mail::table>

<x-mail::table>
| Phone                   |
| :---------------------- |
| {{$contactInfo->phone}} |
</x-mail::table>

**Address:**<br>
{{$contactInfo->address1}}<br>
@if($contactInfo->address2)
{{$contactInfo->address2}}<br>
@endif
{{$contactInfo->city}}<br>
@if($contactInfo->state)
{{$contactInfo->state}}<br>
@endif
{{$contactInfo->country}}

<x-mail::table>
| Postcode                   |
| :------------------------- |
| {{$contactInfo->postcode}} |
</x-mail::table>

**Message:**<br>
<x-mail::panel>
{!! nl2br($contactInfo->message) !!}
</x-mail::panel>

Thanks,<br>
{{ config('app.name') }} Website

</x-mail::message>
