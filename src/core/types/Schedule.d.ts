export type LessonType = {
    id: number;
    subject: {
        id: number;
        name: string;
        type: string;
    };
    startTime: Date;
    endTime: Date;
    location: string;
    absence?: boolean;
    grade?: number;
};

export type ScheduleType = {
    date: Date;
    lessons: LessonType[];
};
