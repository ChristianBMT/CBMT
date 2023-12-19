-- CreateTable
CREATE TABLE "Devotion" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "author_id" STRING NOT NULL,
    "bible_verse_id" STRING NOT NULL,
    "content" STRING NOT NULL,
    "prayer" STRING,
    "devotion_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Devotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Devotion_Tag" (
    "id" STRING NOT NULL,
    "devotion_id" STRING NOT NULL,
    "tag_id" STRING NOT NULL,

    CONSTRAINT "Devotion_Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "about" STRING DEFAULT '',

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Devotion_author_id_idx" ON "Devotion"("author_id");

-- AddForeignKey
ALTER TABLE "Devotion" ADD CONSTRAINT "Devotion_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devotion_Tag" ADD CONSTRAINT "Devotion_Tag_devotion_id_fkey" FOREIGN KEY ("devotion_id") REFERENCES "Devotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devotion_Tag" ADD CONSTRAINT "Devotion_Tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
