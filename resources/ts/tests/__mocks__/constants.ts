import { responseLinks } from "@/helper";

export const passedClass = "bg-bibletime-pink";

export const videoList: VideoListMeta[] = [
    {
        title: "아버지의 이야기",
        month: "12월",
        series: "아버지의 이야기",
        id: 1,
        imageLink: "https://images.unsplash.com/photo-1672491441167-1daa7c3c95a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        routename: "video",
    }
]

export const mockLinksObject: responseLinks = {
    'level0': [{
        link: 'test',
        dateModified: "123",
        size: "123",
        series: "A",
        monthNumber: 2,

    },
    {
        link: 'test',
        dateModified: "123",
        size: "123",
        series: "A",
        monthNumber: 3,

    },
    {
        link: 'test',
        dateModified: "123",
        size: "123",
        series: "B",
        monthNumber: 4,

    },
    {
        link: 'test',
        dateModified: "123",
        size: "123",
        series: "A",
        monthNumber: 4,
    }]
};
