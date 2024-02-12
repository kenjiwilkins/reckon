const imageUrl = process.env.NEXT_PUBLIC_SERVICE_IMAGE_URL;

function AppImage() {
  return (
    <>
      <div id="image" className="my-auto mb-9 mt-12 flex h-16 items-center justify-center">
        <img src={imageUrl} alt="Kenji Wilkins" className="h-16 w-16 rounded-full" />
      </div>
    </>
  );
}

export { AppImage };

export default AppImage;
