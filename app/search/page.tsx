export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ s?: string }>
}) {
  const params = await searchParams;

  
  return <div>sample: {params.s}</div>
}