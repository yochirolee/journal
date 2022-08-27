import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const ImageGallery = () => {
	const { active: note } = useSelector((state) => state.Journal);
	const { imagesUrls } = note;

	return (
		<>
			{!!imagesUrls ? (
				<ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={164}>
					{imagesUrls.map((url) => (
						<ImageListItem key={url}>
							<img
								src={`${url}?w=164&h=164&fit=crop&auto=format`}
								srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
								alt={url}
								loading="lazy"
							/>
						</ImageListItem>
					))}
				</ImageList>
			) : null}
		</>
	);
};
