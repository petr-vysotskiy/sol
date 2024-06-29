import Foundation
import SwiftUI

//enum Variant {
//  success
//  error
//}

enum Variant {
  case success
  case error
}

struct ToastView: View {
  var text: String
  var variant: Variant

  var body: some View {
    HStack {
      if variant == .success {
        Circle()
          .fill(Color.green)
          .frame(width: 10, height: 10)
      } else if variant == .error {
        Circle()
          .fill(Color.red)
          .frame(width: 10, height: 10)
      }
      Text(text)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
    .padding(EdgeInsets(top: 0, leading: 15, bottom: 0, trailing: 15))
//    .overlay(
//      RoundedRectangle(cornerRadius: 8)
//        .stroke(variant == .error ? Color.red.opacity(0.7) : Color.green.opacity(0.7), lineWidth: 1)  // Red border if variant is error, otherwise green border
//    )
//    .cornerRadius(8)
    .edgesIgnoringSafeArea(.all)
    .frame(minWidth: 120, minHeight: 20)
    .fixedSize()
    .onTapGesture {
      DispatchQueue.main.async {
        let appDelegate = NSApp.delegate as? AppDelegate
        appDelegate?.dismissToast()
      }
    }
  }
}
