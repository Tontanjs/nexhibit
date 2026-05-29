import { FloorPlan, Logo, QRBadge, ReverseFairDiagram, ScannerOverlay } from "../../src/components/icons";

export function SvgPreview() {
  return (
    <main
      style={{
        display: "grid",
        gap: 32,
        padding: 32,
        background: "#F8FAFC",
        color: "#0A0E1A",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <section>
        <h1>NEXHIBIT SVG Preview</h1>
        <p>Use this page for browser-level checks before moving icons into src/components/icons.</p>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
        <QRBadge studentId="stu-001" boothNumber="B-23" />
        <ScannerOverlay scanning />
        <Logo size="lg" />
      </section>

      <section style={{ display: "grid", gap: 24 }}>
        <FloorPlan highlightedBooth="B-23" width="100%" />
        <FloorPlan highlightedBooth="E-4" numbering="category" width="100%" />
        <ReverseFairDiagram width="100%" />
      </section>
    </main>
  );
}
