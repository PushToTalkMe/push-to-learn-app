export default function About({ params }: { params: { courseId: number } }) {
  return <div>Курс с id: {params.courseId}</div>;
}
