import React from "react";
import "./App.css";
import { Photo, searchPhotos, uploadPhoto } from "./api";
import { TextField, Typography } from "@material-ui/core";
import { PhotoComponent } from "./PhotoComponent";
import { UploadButton } from "./UploadButton";
import { Pagination } from "@material-ui/lab";


const PAGE_SIZE = 12;

function App() {
  const [nameFilter, setNameFilter] = React.useState<string>("");
  const [photos, setPhotos] = React.useState<Photo[] | null>(null);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState<number | null>(null);
  const [uploadCount, setUploadCount] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const from = (page - 1) * PAGE_SIZE;
      const { count, photos } = await searchPhotos(nameFilter, from);
      const pageCount = Math.ceil(count / PAGE_SIZE);
      setCount(pageCount > 1 ? pageCount : null);
      setPhotos(photos);
    })();
  }, [nameFilter, page, uploadCount]);

  const nameFilterChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(evt.target.value);
    setPage(1);
  };

  const pageChanged = (_evt: unknown, page: number) => {
    setPage(page);
  };

  const onUpload = async (files: File[]) => {
    await Promise.all(files.map(file => uploadPhoto("test", file)));

    setNameFilter('');
    setPage(1);
    setUploadCount(c => c + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="toolbar">
          <TextField
            id="outlined-basic"
            className="filter-input"
            label="Search images"
            variant="outlined"
            size="small"
            value={nameFilter}
            onChange={nameFilterChanged}
          />
          <UploadButton onUpload={onUpload} />
        </div>

        <div className="photos-container">
          {photos?.map((photo) => (
            <PhotoComponent key={photo.id} photo={photo} />
          ))}

          {(photos == null || photos.length === 0) && <Typography>
            No photos found.
            </Typography>}
        </div>

        {count != null && (
          <Pagination page={page} onChange={pageChanged} count={count} />
        )}
      </header>
    </div>
  );
}

export default App;
