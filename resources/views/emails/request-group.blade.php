<x-mail::message>

# New Group/School Request from {{$request->firstname}} {{$request->lastname}}

<x-mail::table>
| First Name              | Last Name              |
| :---------------------- | :--------------------- |
| {{$request->firstname}} | {{$request->lastname}} |
</x-mail::table>

<x-mail::table>
| Email               |
| :------------------ |
| {{$request->email}} |
</x-mail::table>

<x-mail::table>
| Phone               |
| :------------------ |
| {{$request->phone}} |
</x-mail::table>

**Address:**<br>
{{$request->address1}}<br>
@if($request->address2)
{{$request->address2}}<br>
@endif
{{$request->city}}<br>
@if($request->state)
{{$request->state}}<br>
@endif
{{$request->country}}

<x-mail::table>
| Postcode               |
| :--------------------- |
| {{$request->postcode}} |
</x-mail::table>

<x-mail::table>
| Type               | No of Students                 | Age Range              |
| :----------------- | :----------------------------- | :--------------------- |
| {{$request->type}} | {{$request->numberOfStudents}} | {{$request->ageRange}} |
</x-mail::table>

**Message:**<br>
<x-mail::panel>
{!! nl2br($request->message) !!}
</x-mail::panel>

Thanks,<br>
{{ config('app.name') }} Website

</x-mail::message>
