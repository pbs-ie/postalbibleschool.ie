<x-mail::message>

# Order changes made for {{ $schoolName }}

## New Order values

<x-mail::table>
| Title | Old value | New value |
| :---- | --------: | --------: |
| Classroom Name | {{ $oldClassroom->name }} |{{ $newClassroom->name }} |
| Curriculum | {{ $oldClassroom->curriculum->name }} |{{ $newClassroom->curriculum->name }} |
| Level 0 | {{ $oldClassroom->level_0_order }} |{{ $newClassroom->level_0_order }} |
| Level 1 | {{ $oldClassroom->level_1_order }} |{{ $newClassroom->level_1_order }} |
| Level 2 | {{ $oldClassroom->level_2_order }} |{{ $newClassroom->level_2_order }} |
| Level 3 | {{ $oldClassroom->level_3_order }} |{{ $newClassroom->level_3_order }} |
| Level 4 | {{ $oldClassroom->level_4_order }} |{{ $newClassroom->level_4_order }} |
| TLP | {{ $oldClassroom->tlp_order }} | {{ $newClassroom->tlp_order }}|
</x-mail::table>

Thanks,<br>
{{ config('app.name') }}

</x-mail::message>