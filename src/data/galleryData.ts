export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export const categories = ['All', 'Youth Sunday', 'Ministry', 'Architecture', 'People', 'Community Gathering'];

export const staticGalleryData: GalleryItem[] = [
  { id: 1, title: "Sunday Service", description: "Beautiful moments from our Sunday service", imageUrl: "/images/crowd.jpg", category: "Ministry" },
  { id: 2, title: "Church Building", description: "Our church community coming together", imageUrl: "/images/church.jpg", category: "Architecture" },
  { id: 3, title: "Prayer Time", description: "Devoted moments of prayer and reflection", imageUrl: "/images/crowd2.jpg", category: "Ministry" },
  { id: 4, title: "Youth Ministry", description: "Engaging with our young members", imageUrl: "/images/youth.jpg", category: "People" },
  { id: 5, title: "Chamboli Cell Meeting", description: "Our cell meetings", imageUrl: "/images/community3.jpg", category: "Community Gathering" },
  { id: 6, title: "Children's Ministry", description: "Engaging with our children", imageUrl: "/images/children4.jpg", category: "Ministry" },
];

// Captions based on observed content from the documents
const outdoorCaptions = [
  "Youth group standing together outdoors",
  "Fellowship after the service",
  "Young members in the church grounds",
  "Youth bonding time outdoors",
  "Smiles and joy after worship",
  "Friends united in Christ",
  "Youth fellowship moment",
  "Together in faith outdoors",
  "Church grounds gathering",
  "After-service fellowship",
];

const indoorCaptions = [
  "Youth worship at the altar",
  "Congregation in prayer",
  "Praise and worship session",
  "Youth leading worship",
  "Prayer at the altar",
  "United in worship",
  "Youth Sunday service moment",
  "Worship in the sanctuary",
  "Hebrews 10:24 — motivating one another",
  "Waiting on God prayer session",
];

const portraitCaptions = [
  "Radiating joy in the Lord",
  "Youth member portrait",
  "Confidence in Christ",
  "Church family bond",
  "Sisters in the faith",
  "Brothers in Christ",
  "Young and faithful",
  "Blessed and grateful",
  "Youth ministry member",
  "Walking in purpose",
];

function getCaption(index: number, type: 'outdoor' | 'indoor' | 'portrait'): string {
  const captions = type === 'outdoor' ? outdoorCaptions : type === 'indoor' ? indoorCaptions : portraitCaptions;
  return captions[index % captions.length];
}

// Document 1 images (45 photos — mostly outdoor group & portrait shots)
const doc1Images: GalleryItem[] = Array.from({ length: 45 }, (_, i) => ({
  id: 200 + i,
  title: `Youth Sunday Photo ${i + 1}`,
  description: getCaption(i, i % 3 === 0 ? 'indoor' : i % 2 === 0 ? 'outdoor' : 'portrait'),
  imageUrl: `/images/youth-d1-${String(i + 1).padStart(2, '0')}.jpg`,
  category: "Youth Sunday",
}));

// Document 2 images (mixed indoor/outdoor, some pages had 2 photos)
const doc2SingleImages: GalleryItem[] = [];
const doc2PairedImages: GalleryItem[] = [];

// Pages with paired images (a/b)
const pairedPages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
// Pages with single images (15-50 range)
const singlePages = Array.from({ length: 36 }, (_, i) => i + 15);

let doc2Id = 300;
for (const p of pairedPages) {
  const pg = String(p).padStart(2, '0');
  doc2PairedImages.push({
    id: doc2Id++,
    title: `Waiting on God — ${doc2Id % 2 === 0 ? 'Worship' : 'Fellowship'}`,
    description: getCaption(p, p % 2 === 0 ? 'indoor' : 'outdoor'),
    imageUrl: `/images/youth-d2-${pg}a.jpg`,
    category: "Youth Sunday",
  });
  doc2PairedImages.push({
    id: doc2Id++,
    title: `Youth Sunday Moment ${p}`,
    description: getCaption(p + 1, p % 2 === 0 ? 'outdoor' : 'indoor'),
    imageUrl: `/images/youth-d2-${pg}b.jpg`,
    category: "Youth Sunday",
  });
}

for (const p of singlePages) {
  doc2SingleImages.push({
    id: doc2Id++,
    title: `Youth Sunday Highlight ${p}`,
    description: getCaption(p, p % 3 === 0 ? 'indoor' : p % 2 === 0 ? 'portrait' : 'outdoor'),
    imageUrl: `/images/youth-d2-${p}.jpg`,
    category: "Youth Sunday",
  });
}

// Also add the special paired pages 48
doc2SingleImages.push(
  { id: doc2Id++, title: "Youth Sunday Finale", description: "Closing moments of a blessed service", imageUrl: "/images/youth-d2-48a.jpg", category: "Youth Sunday" },
  { id: doc2Id++, title: "Youth Sunday Group Photo", description: "Final group photo together", imageUrl: "/images/youth-d2-48b.jpg", category: "Youth Sunday" },
);

export const youthSundayImages: GalleryItem[] = [
  // Original 12 curated images first
  { id: 101, title: "Youth Preaching the Word", description: "A young minister delivers a powerful sermon at the altar", imageUrl: "/images/youth-preaching.jpg", category: "Youth Sunday" },
  { id: 102, title: "Congregation in Worship", description: "The youth congregation gathered in unified worship and praise", imageUrl: "/images/youth-congregation.jpg", category: "Youth Sunday" },
  { id: 103, title: "Youth Group Outdoors", description: "Young members standing together after the outdoor service", imageUrl: "/images/youth-group-outdoor.jpg", category: "Youth Sunday" },
  { id: 104, title: "Sisters in Christ", description: "Two young ladies in Mercy Seat uniform radiating joy", imageUrl: "/images/youth-sisters.jpg", category: "Youth Sunday" },
  { id: 105, title: "Generations Together", description: "A mother and daughter sharing a precious moment in matching church attire", imageUrl: "/images/youth-mother-daughter.jpg", category: "Youth Sunday" },
  { id: 106, title: "Joy of the Lord", description: "A young woman full of joy and confidence at the church grounds", imageUrl: "/images/youth-peace-sign.jpg", category: "Youth Sunday" },
  { id: 107, title: "Youth Fellowship", description: "Young friends bonding together after the service", imageUrl: "/images/youth-friends.jpg", category: "Youth Sunday" },
  { id: 108, title: "Best Friends at Church", description: "Two young ladies enjoying fellowship and sisterhood", imageUrl: "/images/youth-besties.jpg", category: "Youth Sunday" },
  { id: 109, title: "Youth Worship Service", description: "Youth gathered at the altar during the Waiting on God prayer session", imageUrl: "/images/youth-worship-service.jpg", category: "Youth Sunday" },
  { id: 110, title: "Full Youth Assembly", description: "The entire youth group photo after a blessed Sunday service", imageUrl: "/images/youth-full-group.jpg", category: "Youth Sunday" },
  { id: 111, title: "Little One in the Faith", description: "A young child proudly wearing the Mercy Seat polo shirt", imageUrl: "/images/youth-child.jpg", category: "Youth Sunday" },
  { id: 112, title: "Prayer at the Altar", description: "Youth Sunday congregation with the pastor leading from the pulpit", imageUrl: "/images/youth-prayer-altar.jpg", category: "Youth Sunday" },
  // All additional photos from documents
  ...doc1Images,
  ...doc2PairedImages,
  ...doc2SingleImages,
];
