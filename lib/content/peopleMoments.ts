/** Static gallery for the People page carousel (`public/Carousel/`). */

const CAROUSEL_BASE = "/Carousel/";

const FILENAMES = [
  "crash-lab-people-moment-01.jpeg",
  "crash-lab-people-moment-02.jpeg",
  "crash-lab-people-moment-03.jpeg",
  "crash-lab-people-moment-04.jpeg",
  "crash-lab-people-moment-05.jpeg",
  "crash-lab-people-moment-06.jpeg",
  "crash-lab-people-moment-07.jpeg",
  "crash-lab-people-moment-08.jpeg",
  "crash-lab-people-moment-09.jpeg",
  "crash-lab-people-moment-10.jpeg",
  "crash-lab-people-moment-11.jpeg",
] as const;

export type PeopleMomentSlide = {
  src: string;
  alt: string;
};

export const peopleMomentSlides: PeopleMomentSlide[] = FILENAMES.map(
  (filename, index) => ({
    src: encodeURI(`${CAROUSEL_BASE}${filename}`),
    alt: `CRASH Lab — team, collaborators, and moments (${index + 1} of ${FILENAMES.length})`,
  }),
);
