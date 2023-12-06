# STEP Config Formats
Format for the config JSON file
```JSON stepconfig.json
{
    "jsonPath": "video_json\/",
    "imagePath": "/events/step/image",
    "content": [
        {
            "id": "<number>",
            "heading": "<title>",
            "description": "<description>",
            "date": "<Month YYYY>",
            "routename": "<monthyyyy>",
            "imageLink": "/events/step/image/step-job",
            "showDetails": <true|false>
        }, ...
    ]
}
 ```
 Format for the content JSON file
 ```JSON <routename.json>
 {
    "content": [
        {
            "id": "<number>",
            "externalUrl": "<embed url>",
            "title": "<video title>",
            "duration": "<video duration>"
        }, ...
    ]
 }
 ```