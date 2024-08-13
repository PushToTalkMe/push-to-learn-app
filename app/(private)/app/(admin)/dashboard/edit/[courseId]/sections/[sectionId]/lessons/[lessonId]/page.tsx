import { idValidation } from '@/helpers/id-validation';
import styles from './page.module.css';
import { notFound } from 'next/navigation';
import { TextEditorProvider } from '@/app/components/pages/editor/context';
import ToolPanel from '@/app/components/pages/editor/tool-panel';
import { TextEditor } from '@/app/components/pages/editor/text-editor';

export default function CreateLessons({
  params,
}: {
  params: { courseId: number };
}) {
  if (!params.courseId || !idValidation(String(params.courseId))) {
    notFound();
  }
  return (
    <div className={styles.page}>
      <div className={styles.currentCourse}></div>
      <div className={styles.textBlock}>
        {/* <TextEditorProvider>
          <ToolPanel />
          <TextEditor />
        </TextEditorProvider> */}
      </div>
    </div>
  );
}
