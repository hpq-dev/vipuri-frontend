import { type JSX } from "react";

const PATTERNS = {
  color: /^!\{([0-9a-fA-F]{6})\}/,
  bold: /^\*\*(.*?)\*\*/s,
  badge: /^!\[(.*?)\]/s,
} as const;

class MessageFormatter {
  private elementKey = 0;

  private getNextKey(): number {
    return this.elementKey++;
  }

  private parseText(
    text: string,
    currentColor: string = "#ffffff"
  ): JSX.Element[] {
    const elements: JSX.Element[] = [];
    let index = 0;

    while (index < text.length) {
      // COLOR
      const colorMatch = text.slice(index).match(PATTERNS.color);
      if (colorMatch) {
        currentColor = `#${colorMatch[1]}`;
        index += colorMatch[0].length;
        continue;
      }

      // BOLD
      const boldMatch = text.slice(index).match(PATTERNS.bold);
      if (boldMatch) {
        elements.push(
          <span
            key={this.getNextKey()}
            className="font-extrabold"
            style={{ color: currentColor }}
          >
            {this.parseText(boldMatch[1], currentColor)}
          </span>
        );
        index += boldMatch[0].length;
        continue;
      }

      // BADGE
      const badgeMatch = text.slice(index).match(PATTERNS.badge);
      if (badgeMatch) {
        elements.push(
          <span
            key={this.getNextKey()}
            className="mr-[0.2vw] rounded-[0.4vh] px-[0.35vw] py-[0.35vh] text-[0.6vw] font-semibold tracking-wider text-light"
            style={{ backgroundColor: currentColor }}
          >
            {this.parseText(badgeMatch[1], currentColor)}
          </span>
        );
        index += badgeMatch[0].length;
        continue;
      }

      // TEXT SIMPLU
      elements.push(
        <span key={this.getNextKey()} style={{ color: currentColor }}>
          {text[index]}
        </span>
      );
      index++;
    }

    return elements;
  }

  public format(message: string): JSX.Element[] {
    this.elementKey = 0;
    return this.parseText(message);
  }
}

const formatter = new MessageFormatter();

export const formatMessage = (message: string): JSX.Element[] => {
  return formatter.format(message);
};

export const sanitizeUserMessage = (message: string): string => {
  return message
    .replace(/!\{[0-9a-fA-F]{6}\}/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/!\[(.*?)\]/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
};
