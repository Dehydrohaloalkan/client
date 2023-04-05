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
    group?: {
        id: number;
        number: string;
    };
};

export type ScheduleType = {
    date: Date;
    lessons: LessonType[];
};
