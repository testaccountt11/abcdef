export default function Home() {
  return (
    <div>
      <h1>Loading...</h1>
      <script dangerouslySetInnerHTML={{ __html: `window.location.href = '/client'` }} />
    </div>
  );
}
