import Title from '@/components/common/title/title';
import { useRouter } from 'next/router';
import EntryForm from '@/components/start-pet/entry-form/entry-form';
import { usePetsModifyQuery } from '@/hooks/queries/my/pets/usePostPetsQueries';
import { FieldValues } from 'react-hook-form';
import { imageUpload } from '@/api/image-api';
import { useGetPetsDetailsQuery } from '@/hooks/queries/my/pets/useGetPetsQueries';
import PetFormSkeleton from '@/components/skeleton/mypage/pet/pet-form-skeleton';

interface ModifyPetFormType {
  routeUrl: string;
}

export default function ModifyPetForm({ routeUrl }: ModifyPetFormType) {
  const router = useRouter();
  const { query } = router;
  const { data, isLoading } = useGetPetsDetailsQuery(query!.id as string);
  const { id } = router.query;
  const { mutate } = usePetsModifyQuery();

  const handleSubmit = async (data: FieldValues) => {
    if (typeof data.imageId === 'object' && data.imageId !== null) {
      const submitData = { files: data.imageId[0] };
      const response = await imageUpload(submitData);
      data.imageId = response.data.data[0];
    }

    if (id) {
      mutate(
        {
          data: {
            imageId: data.imageId,
            name: data.name,
            sex: data.sex,
            birthDate: data.birthDate,
            adoptionDate: data.adoptionDate,
            type: data.type,
            species: data.species,
            weight: Number(data.weight),
            isNeutered: Boolean(data.isNeutered),
          },
          petsId: id.toString(),
        },
        {
          onSuccess: () => {
            router.push(routeUrl);
          },
        },
      );
    }
  };
  if (isLoading) return <PetFormSkeleton />;
  const defaultValue = {
    ...data.data,
    imageId: data.data.petProfileImageId,
  };
  return (
    <section style={{ padding: '126px 24px 51px' }}>
      <Title>반려동물 수정</Title>
      <EntryForm onSubmit={handleSubmit} defaultData={defaultValue} buttonText="반려동물 수정하기" />
    </section>
  );
}
