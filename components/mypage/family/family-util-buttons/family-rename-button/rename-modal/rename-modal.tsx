import Form from '@/components/common/Form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/common/button/button';
import styles from './rename-modal.module.scss';
import { useFamilyModifyQuery } from '@/hooks/queries/my/family/usePostFamilyQueries';
import { ModalType } from '@/hooks/use-modal';
import { AnimatePresence } from 'framer-motion';

interface RenameModalType extends ModalType {
  name: string;
}

export default function RenameModal({ Modal, handleModal, name, isOpen }: RenameModalType) {
  const methods = useForm<FieldValues>({
    defaultValues: {
      name: name,
    },
    mode: 'onBlur',
  });
  const { handleSubmit, watch } = methods;
  const buttonClassCondition = !watch('name') || watch('name') === name ? 'disabled' : 'primary';
  const { mutate } = useFamilyModifyQuery();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate({ data: { name: data.name } });
    handleModal(false);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal>
          <div className={styles.form}>
            <Form onSubmit={handleSubmit(onSubmit)} methods={methods}>
              <div className={styles.inputBox}>
                <Form.Label htmlFor="name">가족이름 변경하기</Form.Label>
                <Form.MainInput name="name" />
              </div>
              <div className={styles.buttonBox}>
                <Button type="submit" className={buttonClassCondition} leftRound rightRound>
                  변경하기
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
