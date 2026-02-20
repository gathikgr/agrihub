import { NextRequest, NextResponse } from "next/server";

const roleData = {
  farmer: {
    cropStatus: "healthy",
    daysToHarvest: 18,
    expenses: 42500,
    nearbyTransporters: 12,
    nearbyStorage: 8,
    chart: [
      { day: "D1", price: 2200 },
      { day: "D2", price: 2230 },
      { day: "D3", price: 2275 },
      { day: "D4", price: 2320 },
      { day: "D5", price: 2290 },
      { day: "D6", price: 2350 },
      { day: "D7", price: 2380 }
    ]
  },
  buyer: { approvedListings: 26, activeOrders: 5, orderHistory: 41 },
  transporter: { requests: 17, capacity: 74, deliveries: 93 },
  storage: { bookings: 28, occupancy: 81, revenue: 380000 },
  admin: { userApprovals: 9, listingApprovals: 14, transactions: 2210000, aiOutputs: 127 }
};

export async function GET(_: NextRequest, { params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (!(role in roleData)) {
    return NextResponse.json({ error: "invalid_role" }, { status: 404 });
  }
  return NextResponse.json(roleData[role as keyof typeof roleData]);
}
