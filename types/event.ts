interface EventBase {
  id: number;
  title: string;
  imageUrl: string;
  operationMode: string;
  statusId: number;
  eventTypeId: number;
  orgId: number;
  organization: string;
  applyLink: string;
  tags?: string;
  isPeriodEvent: boolean;
  capacity: number;
  location: string;
  applyCount: number;
  isInterested?: boolean;
  matchedInterestPriority?: number;
  isBookmarked?: boolean;
}

export interface EventDTO extends EventBase {
  applyStart: string | null;
  applyEnd: string | null;
  eventStart: string | null;
  eventEnd: string | null;
}

export interface Event extends EventBase {
  applyStart: Date | null;
  applyEnd: Date | null;
  eventStart: Date | null;
  eventEnd: Date | null;
}

export interface EventDetail extends Event {
  bookmarkCount: number;
  detail: string;
}
