import { Photo, photoUrl } from "./api";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const SIZE = 400;

const useStyles = makeStyles(() => ({
  root: {
    width: SIZE,
    height: SIZE,
    borderRadius: 16,
    border: '1px gray solid',
    overflow: 'hidden',
    position: 'relative',
    margin: 8
  },
  image: {
      display: 'block',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
  },
  wide: {
    maxHeight: SIZE
  },
  tall: {
    maxWidth: SIZE
  }
}));

export function PhotoComponent({ photo }: { photo: Photo }) {
  const { root, image, wide, tall } = useStyles();
  let imagePosition: string | undefined;

  if (photo.width > photo.height) {
      imagePosition = wide;
  } else {
      imagePosition = tall;
  }

  return (
    <div className={root}>
      <img className={clsx(image, imagePosition)} alt={photo.name} src={photoUrl(photo)} />
    </div>
  );
}
