import { CATEGORY_MAX_INDEX, CATEGORY_MIN_INDEX } from '@/util/calendar/constants';
import type { Event, EventDTO } from '@/types/event';

export function transformEvent(dto: EventDTO): Event {
  const today = new Date();

  return {
    ...dto,
    // Web falls back to a bundled public asset for this known-broken host; RN has no
    // equivalent public path, so an empty string signals "no image" to the UI layer.
    imageUrl: dto.imageUrl.includes('extra.snu.ac.kr/comm/cmfile/') ? '' : dto.imageUrl,
    eventTypeId:
      dto.eventTypeId && dto.eventTypeId <= CATEGORY_MAX_INDEX && dto.eventTypeId >= CATEGORY_MIN_INDEX
        ? dto.eventTypeId - 3
        : 6,
    applyStart: dto.applyStart ? new Date(dto.applyStart) : null,
    applyEnd: dto.applyEnd ? new Date(dto.applyEnd) : null,
    eventStart: dto.eventStart ? new Date(dto.eventStart) : null,
    eventEnd: dto.eventEnd ? new Date(dto.eventEnd) : null,

    statusId: dto.statusId
      ? dto.statusId
      : dto.applyEnd
        ? new Date(dto.applyEnd) < today // 모집 마감 날짜가 지남
          ? 2 // 모집 마감
          : 1 // 모집 중
        : 2,
  };
}
