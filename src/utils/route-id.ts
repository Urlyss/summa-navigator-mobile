export type ParsedRoute = {
  partId?: string;
  treatiseId?: number;
  questionId?: number;
  articleId?: number;
};

export function parseRouteId(id: string): ParsedRoute {
  const parts = id.split("-");
  const result: ParsedRoute = {};

  for (const part of parts) {
    if (part.startsWith("Pt")) {
      result.partId = part.slice(2);
    } else if (part.startsWith("Tr")) {
      result.treatiseId = Number(part.slice(2));
    } else if (part.startsWith("Qu")) {
      result.questionId = Number(part.slice(2));
    } else if (part.startsWith("Ar")) {
      result.articleId = Number(part.slice(2));
    }
  }

  return result;
}

export function routeDepth(id: string) {
  return id.split("-").length;
}

export function routeLabel(id: string) {
  const depth = routeDepth(id);
  return (
    {
      1: "Part",
      2: "Treatise",
      3: "Question",
      4: "Article",
    }[depth] ?? "Entry"
  );
}

export function buildPartId(partOriginalId: string) {
  return `Pt${partOriginalId}`;
}

export function buildTreatiseId(partOriginalId: string, treatiseOriginalId: number) {
  return `${buildPartId(partOriginalId)}-Tr${treatiseOriginalId}`;
}

export function buildQuestionId(
  partOriginalId: string,
  treatiseOriginalId: number,
  questionOriginalId: number
) {
  return `${buildTreatiseId(partOriginalId, treatiseOriginalId)}-Qu${questionOriginalId}`;
}

export function buildArticleId(
  partOriginalId: string,
  treatiseOriginalId: number,
  questionOriginalId: number,
  articleOriginalId: number
) {
  return `${buildQuestionId(partOriginalId, treatiseOriginalId, questionOriginalId)}-Ar${articleOriginalId}`;
}

export function buildArticleShortContextId(
  partOriginalId: string,
  treatiseOriginalId: number,
  questionOriginalId: number,
  articleOriginalId: number
) {
  const articleId = buildArticleId(
    partOriginalId,
    treatiseOriginalId,
    questionOriginalId,
    articleOriginalId
  );
  return articleId.replace(/-/g, "\n").replace(/Ar/g, "Article : ").replace(/Qu/g, "Question : ").replace(/Tr/g, "Treatise : ").replace(/Pt/g, "Part : ");
}
