export interface Video {
  id: string,
  title: string;
  description: string;

  /*"snippet": {
    "publishedAt": any,
    "channelId": string,
    "title": string,
    "description": string,
    "thumbnails": any,
    "channelTitle": string,
    "tags": string[],
    "categoryId": string,
    "liveBroadcastContent": string,
    "defaultLanguage": string,
    "localized": {
      "title": string,
      "description": string
    },
    "defaultAudioLanguage": string
  },
  "contentDetails": {
    "duration": string,
    "dimension": string,
    "definition": string,
    "caption": string,
    "licensedContent": boolean,
    "regionRestriction": {
      "allowed": [ string ],
      "blocked": [ string ]
    },
    "contentRating": any,
    "projection": string,
    "hasCustomThumbnail": boolean
  },
  "status": {
    "uploadStatus": string,
    "failureReason": string,
    "rejectionReason": string,
    "privacyStatus": string,
    "publishAt": any,
    "license": string,
    "embeddable": boolean,
    "publicStatsViewable": boolean,
    "madeForKids": boolean,
    "selfDeclaredMadeForKids": boolean
  },
  "statistics": any,
  "player": any,
  "topicDetails": any,
  "recordingDetails": any,
  "fileDetails": any,
  "processingDetails": any,
  "suggestions": any,
  "liveStreamingDetails": any,
  "localizations": any*/
}

export const emptyVideo: Video = {
  id: null,
  title: null,
  description: null,
};
