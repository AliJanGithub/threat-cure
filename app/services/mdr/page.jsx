"use client";

import ServicesLearnMore, { mdrService } from "../../../components/ServicesLearnMore";

export default function MDRPage() {
  return <ServicesLearnMore title={mdrService.title} content={mdrService.content} />;
}
