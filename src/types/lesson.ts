import lessonCategory from "./lessonCategory";
import LessonGroup from "./lessonGroups";
import OpenLesson from "./openlesson";

interface Lesson {
    id: number,
    categories: Array<lessonCategory>,
    ads_banner: string,
    groups: Array<LessonGroup>,
    name: string,
    open_lessons: Array<OpenLesson>,
    slug: string
}
export default Lesson