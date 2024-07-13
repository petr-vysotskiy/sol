import Foundation

let appDelegate = NSApp.delegate as? AppDelegate

final class Panel: NSPanel, NSWindowDelegate {
  var visualEffectView: NSVisualEffectView!

  init(contentRect: NSRect) {
    super.init(
      contentRect: contentRect,
      styleMask: [.titled, .closable, .resizable, .fullSizeContentView, .nonactivatingPanel],
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
    if let closeButton = self.standardWindowButton(.closeButton) {
      closeButton.isHidden = true
    }
    if let minButton = self.standardWindowButton(.miniaturizeButton) {
      minButton.isHidden = true
    }
    if let zoomButton = self.standardWindowButton(.zoomButton) {
      zoomButton.isHidden = true
    }
    self.isReleasedWhenClosed = false
    self.delegate = self
    self.isOpaque = false
    visualEffectView = NSVisualEffectView(frame: self.contentView!.bounds)
    visualEffectView.autoresizingMask = [.width, .height]
    visualEffectView.blendingMode = .behindWindow
    visualEffectView.material = .underWindowBackground
    visualEffectView.state = .active
//    visualEffectView.translatesAutoresizingMaskIntoConstraints = false
    self.contentView = visualEffectView
//    NSLayoutConstraint.activate([
//      visualEffectView.leadingAnchor.constraint(equalTo: self.contentView!.leadingAnchor),
//      visualEffectView.trailingAnchor.constraint(equalTo: self.contentView!.trailingAnchor),
//      visualEffectView.topAnchor.constraint(equalTo: self.contentView!.topAnchor),
//      visualEffectView.bottomAnchor.constraint(equalTo: self.contentView!.bottomAnchor)
//    ])
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
}
