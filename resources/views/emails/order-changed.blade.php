<x-mail::message>

# Order changes made for {{ $schoolName }}

## New Order values

<x-mail::table>
| Level | Old value | New value |
| :---- | --------: | --------: |
| Level 0 | {{ $oldOrder->level0Order }} | {{ $newOrder->level0Order }} |
| Level 1 | {{ $oldOrder->level1Order }} | {{ $newOrder->level1Order }} |
| Level 2 | {{ $oldOrder->level2Order }} | {{ $newOrder->level2Order }} |
| Level 3 | {{ $oldOrder->level3Order }} | {{ $newOrder->level3Order }} |
| Level 4 | {{ $oldOrder->level4Order }} | {{ $newOrder->level4Order }} |
| TLP | {{ $oldOrder->tlpOrder }} | {{ $newOrder->tlpOrder }} |
</x-mail::table>

<x-mail::button :url="$orderUrl">
Go to order
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}

</x-mail::message>
