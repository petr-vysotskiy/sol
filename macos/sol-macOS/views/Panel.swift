import Foundation

let appDelegate = NSApp.delegate as? AppDelegate

final class Panel: NSPanel, NSWindowDelegate {
  init(contentRect: NSRect) {
    super.init(
      contentRect: contentRect,
      styleMask: [.borderless, .fullSizeContentView, .nonactivatingPanel],
      backing: .buffered,
      defer: false
    )

    self.hasShadow = true
    self.level = .mainMenu + 3
    self.collectionBehavior.insert(.fullScreenAuxiliary)  // Allows the pannel to appear in a fullscreen space
    self.collectionBehavior.insert(.canJoinAllSpaces)
    self.titleVisibility = .hidden
    self.titlebarAppearsTransparent = true
    self.isMovableByWindowBackground = true
    self.isReleasedWhenClosed = false
    self.isOpaque = false
    self.delegate = self
    self.backgroundColor = NSColor.clear
  }

  override var canBecomeKey: Bool {
    return true
  }

  override var canBecomeMain: Bool {
    return true
  }

  func windowDidResignKey(_ notification: Notification) {
    DispatchQueue.main.async {
      appDelegate?.hideWindow()
    }
  }
  //
  //  override func setFrame(_ frameRect: NSRect, display flag: Bool) {
  //          super.setFrame(frameRect, display: flag)
  //          updateShadow()
  //      }
  //
  //      private func updateShadow() {
  //          let shadow = NSShadow()
  //          shadow.shadowColor = NSColor.black.withAlphaComponent(0.5)
  //          shadow.shadowOffset = NSMakeSize(0, -10)
  //          shadow.shadowBlurRadius = 20.0
  //
  //          self.contentView?.wantsLayer = true
  //          self.contentView?.layer?.shadow = shadow
  //      }
}
