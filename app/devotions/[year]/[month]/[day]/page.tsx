type DevotionPageProps = {
  params: {
    year: number;
    month: number;
    day: number;
  };
};

export default async function DevotionPage({ params }: DevotionPageProps) {
  return (
    <div>
      {params.year}/{params.month}/{params.day}
    </div>
  );
}
