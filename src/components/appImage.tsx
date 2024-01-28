const imageUrl = process.env.NEXT_PUBLIC_SERVICE_IMAGE_URL;

function AppImage() {
  return (
    <>
      <div
        id="image"
        className="h-16 my-auto flex justify-center items-center mt-12 mb-9"
      >
        <img
          src={imageUrl}
          alt="Kenji Wilkins"
          className="rounded-full w-16 h-16"
        />
      </div>
    </>
  );
}

export default AppImage;
