import { type Page } from "playwright-core";

export async function mockResponse(
  page: Page,
  urlPattern: string,
  response: object,
) {
  await page.route(urlPattern, (route) =>
    route.fulfill({
      body: JSON.stringify(response),
    }),
  );
}
