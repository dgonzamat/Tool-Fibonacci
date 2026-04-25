import { describe, it, expect } from "vitest"
import { generateFibonacciSequence, GOLDEN_RATIO, toolSongs } from "./songs"

describe("generateFibonacciSequence", () => {
  it("returns the canonical first 13 numbers", () => {
    expect(generateFibonacciSequence(12)).toEqual([
      0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144,
    ])
  })

  it("handles n = 0 returning [0]", () => {
    expect(generateFibonacciSequence(0)).toEqual([0])
  })

  it("handles n = 1 returning [0, 1]", () => {
    expect(generateFibonacciSequence(1)).toEqual([0, 1])
  })

  it("each term equals the sum of the two previous", () => {
    const seq = generateFibonacciSequence(20)
    for (let i = 2; i < seq.length; i++) {
      expect(seq[i]).toBe(seq[i - 1] + seq[i - 2])
    }
  })

  it("ratio of consecutive terms converges to phi", () => {
    const seq = generateFibonacciSequence(20)
    const ratio = seq[seq.length - 1] / seq[seq.length - 2]
    expect(ratio).toBeCloseTo(GOLDEN_RATIO, 5)
  })
})

describe("toolSongs", () => {
  it("has Lateralus, Schism and Forty Six & 2", () => {
    const ids = toolSongs.map((s) => s.id).sort()
    expect(ids).toEqual(["fibonacci", "lateralus", "schism"])
  })

  it("every song has a valid YouTube id (11 chars)", () => {
    for (const song of toolSongs) {
      expect(song.youtubeId).toMatch(/^[A-Za-z0-9_-]{11}$/)
    }
  })

  it("every Fibonacci moment falls within the song duration", () => {
    for (const song of toolSongs) {
      for (const moment of song.fibonacciMoments) {
        expect(moment.time).toBeGreaterThan(0)
        expect(moment.time).toBeLessThan(song.duration)
      }
    }
  })

  it("complexity is between 0 and 10", () => {
    for (const song of toolSongs) {
      expect(song.complexity).toBeGreaterThanOrEqual(0)
      expect(song.complexity).toBeLessThanOrEqual(10)
    }
  })

  it("each song has Spanish and English translations for description", () => {
    for (const song of toolSongs) {
      expect(song.description.es.length).toBeGreaterThan(0)
      expect(song.description.en.length).toBeGreaterThan(0)
    }
  })

  it("patterns and fibonacci moments are translated in both languages", () => {
    for (const song of toolSongs) {
      expect(song.patterns.es.length).toBe(song.patterns.en.length)
      for (const moment of song.fibonacciMoments) {
        expect(moment.description.es.length).toBeGreaterThan(0)
        expect(moment.description.en.length).toBeGreaterThan(0)
        expect(moment.significance.es.length).toBeGreaterThan(0)
        expect(moment.significance.en.length).toBeGreaterThan(0)
      }
    }
  })

  it("each song has at least one reference with an https URL", () => {
    for (const song of toolSongs) {
      expect(song.references.length).toBeGreaterThan(0)
      for (const ref of song.references) {
        expect(ref.title.length).toBeGreaterThan(0)
        expect(ref.url).toMatch(/^https:\/\//)
      }
    }
  })
})
