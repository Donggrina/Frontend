import React from 'react';
import Link from 'next/link';
import StoryItemHeader from './story-item-header';
import StoryItemSwiper from './story-item-swiper';
import StoryItemInfo from './story-item-info';
import { Story } from '@/types/story';

export default function StoryItem(props: Story) {
  return (
    <Link href={`/story/${props.diaryId}`}>
      <StoryItemHeader
        content={props.content}
        author={props.author}
        authorImage={props.authorImage}
        weather={props.weather}
        petImages={props.petImages}
      />
      {props.images.length !== 0 && <StoryItemSwiper images={props.images} />}
      <StoryItemInfo
        storyId={props.diaryId}
        favoriteState={props.favoriteState}
        authorGroup={props.authorGroup}
        date={props.date}
        content={props.content}
        favoriteCount={props.favoriteCount}
        commentCount={props.commentCount}
      />
    </Link>
  );
}
